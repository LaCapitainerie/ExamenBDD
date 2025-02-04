import { z } from "zod";

export const Licence = z.object({
    name: z.string(),
    code: z.string(),
});

export type Licence = z.infer<typeof Licence>;

export const LicenceList: Licence[] = [
    { name: "Academic Free License v3.0", code: "AFL-3.0" },
    { name: "Apache 2.0", code: "Apache-2.0" },
    { name: "Artistic 2.0", code: "Artistic-2.0" },
    { name: "Boost 1.0", code: "BSL-1.0" },
    { name: "BSD 2-Clause", code: "BSD-2-Clause" },
    { name: "BSD 3-Clause", code: "BSD-3-Clause" },
    { name: "BSD 3-Clause Clear", code: "BSD-3-Clause-Clear" },
    { name: "BSD 4-Clause", code: "BSD-4-Clause" },
    { name: "0BSD", code: "0BSD" },
    { name: "Creative Commons", code: "CC" },
    { name: "Creative Commons Zero v1.0 Universal", code: "CC0-1.0" },
    { name: "Creative Commons Attribution 4.0", code: "CC-BY-4.0" },
    { name: "Creative Commons Attribution ShareAlike 4.0", code: "CC-BY-SA-4.0" },
    { name: "Do What The F*ck You Want To Public License", code: "WTFPL" },
    { name: "Educational Community License v2.0", code: "ECL-2.0" },
    { name: "Eclipse Public License 1.0", code: "EPL-1.0" },
    { name: "Eclipse Public License 2.0", code: "EPL-2.0" },
    { name: "European Union Public License 1.1", code: "EUPL-1.1" },
    { name: "GNU Affero General Public License v3.0", code: "AGPL-3.0" },
    { name: "GNU General Public License", code: "GPL" },
    { name: "GNU General Public License v2.0", code: "GPL-2.0" },
    { name: "GNU General Public License v3.0", code: "GPL-3.0" },
    { name: "GNU Lesser General Public License", code: "LGPL" },
    { name: "GNU Lesser General Public License v2.1", code: "LGPL-2.1" },
    { name: "GNU Lesser General Public License v3.0", code: "LGPL-3.0" },
    { name: "ISC", code: "ISC" },
    { name: "LaTeX Project Public License v1.3c", code: "LPPL-1.3c" },
    { name: "Microsoft Public License", code: "MS-PL" },
    { name: "MIT", code: "MIT" },
    { name: "Mozilla Public License 2.0", code: "MPL-2.0" },
    { name: "Open Software License 3.0", code: "OSL-3.0" },
    { name: "PostgreSQL License", code: "PostgreSQL" },
    { name: "SIL Open Font License 1.1", code: "OFL-1.1" },
    { name: "University of Illinois/NCSA Open Source License", code: "NCSA" },
    { name: "Unlicense", code: "Unlicense" },
    { name: "zLib License", code: "Zlib" }
];