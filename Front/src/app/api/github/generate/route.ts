import { prisma } from "@/lib/prisma";
import { authRoute } from "@/lib/safe-route";
import { Template } from "@/types/Prisma/Template";
import { NextResponse } from "next/server";
import { Octokit } from "octokit";

const name = "template";

const POSTSchema = Template.pick({ title: true });
export const POST = authRoute
    .body(POSTSchema)
    .handler(async (req, { body, data }) => {

        try {

            const octokit = new Octokit({
                auth: data.access_token,
            });

            const template = await prisma.template.findFirstOrThrow({
                where: {
                    title: body.title,
                    userRelatedId: data.userId,
                },
                include: {
                    milestones: {
                        include: {
                            issues: {
                                include: {
                                    labels: true,
                                }
                            }
                        }
                    },
                }
            }).catch((error) => {
                throw new Error(`Error getting ${name}`);
            });

            const repoValue = await octokit.rest.repos.createForAuthenticatedUser({
                name: template.title,
                private: !template.public,
            }).catch((error) => {
                throw new Error(`Error creating ${name} repo`);
            });

            const owner = repoValue.data.owner.login;
            const repo = repoValue.data.name;

            const milestones = template.milestones
            const issues = template.milestones.flatMap(m => m.issues.map(issue => ({ milestone: m.title, ...issue })));
            const labels = issues.flatMap(issue => issue.labels);


            // Create labels
            await Promise.all(labels.map(async (label) => {

                console.log({
                    owner: owner,
                    repo: repo,
                    name: label.name,
                    color: label.color.replace("#", ""),
                    description: label.description,
                });
                

                await octokit.rest.issues.createLabel({
                    owner: owner,
                    repo: repo,
                    name: label.name,
                    color: label.color.replace("#", ""),
                    description: label.description,
                }).catch((error) => {
                    throw new Error(`Error creating ${label.name} label, ${error}`);
                });
            }));

            // Create milestones
            await Promise.all(milestones.map(async (milestone) => {
                await octokit.rest.issues.createMilestone({
                    owner: owner,
                    repo: repo,
                    title: milestone.title,
                    description: milestone.description,
                    due_on: milestone.dueDate.toISOString(),
                }).catch((error) => {
                    throw new Error(`Error creating ${milestone.title} milestone, ${error}`);
                });
            }));

            const milestonesValue = await octokit.rest.issues.listMilestones({
                owner: owner,
                repo: repo,
            }).catch((error) => {
                throw new Error(`Error fetching milestones`);
            });

            // Create issues
            await Promise.all(issues.map(async (issue) => {
                await octokit.rest.issues.create({
                    owner: owner,
                    repo: repo,
                    title: issue.title,
                    body: issue.description,
                    labels: issue.labels.map(label => ({ name: label.name }) ),
                    milestone: milestonesValue.data.find(m => m.title === issue.milestone)?.number,
                }).catch((error) => {
                    throw new Error(`Error creating ${issue.title} issue, ${error}`);
                });
            }));

            

            return NextResponse.json({ success: true, data: null });

        } catch (error) {

            return NextResponse.json({ message: "Internal server error" + error }, { status: 500 });
        }

    });
