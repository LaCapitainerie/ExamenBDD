# Correction des points de l'audit

Durant le précédent audit, il a été remonté plusieurs anomalies qui ont été corrigées parmis lesquels figuraient ces différents points :

> [!CAUTION]
> Il a été trouvé dans chaque route l'utilisation de requête non sécurisée et sujête à injection SQl, pour remedier cela il est préférable d'utiliser l'environnement disponible via votre ORM Prisma,

> [!CAUTION]
> L'utilisation d'authentification dans le code est necessaire afin de reglementer le périmètre et de permettre aux non administrateurs de ne pas pouvoir acceder à des endroits restreints.

> [!IMPORTANT]
> De plus, un typage faible et sans résolution à été trouvé partout dans le code il est recommander d'utiliser un ultra typage comme possible avec Zod afin de pouvoir gérer les erreurs pouvant vous incomber et d'effacer toutes tentatives d'injections.

> [!NOTE]
> L'uniformisation des données doit se faire à travers l'entièreté du code d'un seul bloc aifn de limiter les irrégularités.
