// import { UserType } from '@/types/User';
// import { z } from 'zod';

// const perm = z.enum([
//     "end:Year",

//     "see:Student",
//     "see:Class",
    
//     "import:Student",
//     "import:Teacher",
//     "import:Class",
    
//     "update:Student",
//     "update:Teacher",
//     "update:Class",

//     "see:All",
//     "import:All",
//     "update:All",

//     "all:Student",
//     "all:Teacher",
//     "all:Class",

//     "all:All",
// ]);

// type perm = z.infer<typeof perm>;

// const permArray: {[k in UserType["role"]]: perm[]} = {
//     '': []
// }

// export function hasPerm(user: UserType["role"] | undefined, action: perm) {
//     if(!user) return false;
//     if(permArray[user].includes("all:All")) return true;
//     if(permArray[user].includes(`all:${action.split(":")[1]}` as perm)) return true;
//     if(permArray[user].includes(`${action.split(":")[0]}:All` as perm)) return true;
//     return permArray[user].includes(action);
// }