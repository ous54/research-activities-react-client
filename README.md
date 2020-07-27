# PFA

👨🏼‍🎓 **Contributeurs :** [Akram Aznakour](https://github.com/AkramAznakour) [Zelma Aubin BIRBA](https://github.com/birbaubin) | 📅 **Date :** Mars 2020

**Description:**

### Tâches | Tasks

| Tâche                                                             |     |
| ----------------------------------------------------------------- | --: |
| Inscrire                                                          |  ✔️ |
| Identifier                                                        |  ✔️ |
| Rechercher un auteur par nom                                      |  ❌ |
| Lister les publications d'auteu                                   |  ❌ |
| RESEARCHER et rechercher des publications par année, SJR, titre   |  ✔️ |
| Afficher SJR des publications                                     |  ❌ |
| Afficher IF des publications                                      |  ❌ |
| Gestion sur les universités, les établissements, les laboratoires         |  ✔️ |
| Gestion des rôles                                                 |  ❌ |
| Gestion des utilisateurs                                          |  ❌ |
| Récupérer les informations des auteurs                            |  ❌ |
| Présenter des statistiques [Plus](#Statistiques)                  |  ❌ |
| Réaliser un logo                                                  |  ❌ |
| Gustation la taille du formulaire d'authentification              |  ✔️ |
| Lister des chercheurs suivis                                      |  ✔️ |
| Gestion des équipes                                               |  ❌ |
| Statistiques                                                      |  ❌ |
| Mettre en évidence les labos qui n'ont pas de chef                |  ❌ |
| Faire des alertes chaque fois qu'un prof publie un nouvel article |  ❌ |
| Imprimer les rapports                                             |  ❌ |
|                                                                   |

<!--
Modification de la photo
Réorganiser l’affichage des chercheurs suivis
Filtrer la liste des chercheurs suivis
Au clic sur un chercher (chargement de son profil) avec un pop-up qui affiche ses nouvelles publications non encore enregistrée dans la base de données avec un bouton pour les enregistrées
Statistiques (tableau : nombre de publication par année par chercheur suivi) -->

### Statistiques

| Statistique                                                                 |     |
| --------------------------------------------------------------------------- | --: |
| Nombre de laboratoire par université                                        |  ❌ |
| Nombre de laboratoire par établissement                                     |  ❌ |
| Nombre d'équipe par laboratoire et par établissement                        |  ❌ |
| Total des productions scientifique par : année, laboratoire, équipe, membre |  ❌ |

### Roles

| Role            |                                                    |
| --------------- | -------------------------------------------------- |
| CED_HEAD        | Gestion des universités                            |
|                 | Gestion des établissements                                 |
|                 | Gestion des laboratoires                           |
|                 | Creation des comptes LABORATORY_HEAD               |
| LABORATORY_HEAD | Gestion des équipes                                |
|                 | Gestion des comptes SEARCHER                       |
|                 | ajoute des SEARCHER aux équipes de son laboratoire |
| RESEARCHER      |                                                    |
|                 | ?                                                  |

## Seeds

### utilisateurs | Users

_Password : email.split("@")[0] example : example.example@gmail.com | example.example_

| firstName   | lastName | email                         | role            |
| ----------- | -------- | ----------------------------- | --------------- |
| Admin       | Admin    | admin@gmail.com               | CED_HEAD        |
| Hassan      | OUAHMANE | hassan.ouahmane@gmail.com     | LABORATORY_HEAD |
| Abdelowahed | HAJJAJI  | Abdelowahed.hajjaji@gmail.com | LABORATORY_HEAD |

<!--
| Abdelfettah     | HAIDINE                | ahaidine@gmail.com            | RESEARCHER      |
| Abdelhak        | Aqqal                  | aqqal.ensaj@gmail.com         | RESEARCHER      |
| Abdelilah       | KADDAR                 | a.kaddar@gmail.com            | RESEARCHER      |
| Abderrahim      | Boutahar               | boutahar.fsac@gmail.com       | RESEARCHER      |
| Abdessamad      | El Ballouti            | elballoutiom@gmail.com        | RESEARCHER      |
| Adiba           | EL BOUZEKRI EL IDRISSI | b.i.adiba1@gmail.com          | RESEARCHER      |
| Ali             | Kartit                 | alikartit@gmail.com           | RESEARCHER      |
| Asmaa           | El Hannani             | elhannani.a@gmail.com         | RESEARCHER      |
| Aziz            | Dahbi                  | dahbi_aziz@gmail.com          | RESEARCHER      |
| Bouchra         | Abouzaid               | babouzaid@gmail.com           | RESEARCHER      |
| Boumediene      | TANOUTI                | tanouti@gmail.com             | RESEARCHER      |
| Chafik          | BAIDADA                | chafik29@gmail.com            | RESEARCHER      |
| Chouaib         | ENNAWAOUI              | chouaib.enna@gmail.com        | RESEARCHER      |
| El Mehdi        | LAADISSI               | laadissi.e@gmail.com          | RESEARCHER      |
| El Mehdi        | LOUALID                | mehdi.loualid@gmail.com       | RESEARCHER      |
| El Mostafa      | SADEK                  | sadek.maths@gmail.com         | RESEARCHER      |
| Fahd            | KALLOUBI               | fahd.kalloubima@gmail.com     | RESEARCHER      |
| Fatima Ezzahrae | Alaoui M’Hamdi         | falaoui2013@gmail.com         | RESEARCHER      |
| Fouad           | Belhora                | f.belhora@gmail.com           | RESEARCHER      |
| Fouad           | KHARROUBI              | fouad.kharroubi@gmail.com     | RESEARCHER      |
| Hamid           | Chaikhy                | chaikhy.hamid@gmail.com       | RESEARCHER      |
| Hasnae          | RAHMANI                | hasnarahmani@gmail.com        | RESEARCHER      |
| Hassan          | ABOUOBAIDA             | hassanabouobaida@gmail.com    | RESEARCHER      |
| Hicham          | Amrani Souhli          | souhli_a@gmail.com            | RESEARCHER      |
| Khalid          | Kandoussi              | khalidp4@gmail.com            | RESEARCHER      |
| Khalid          | FAITAH                 | k.faitah@gmail.com            | RESEARCHER      |
| Lamia           | HAMMADI                | hammadi.lamia@gmail.com       | RESEARCHER      |
| Lamyae          | MAATOUGI               | lamy.maatougui@gmail.com      | RESEARCHER      |
| Madiha          | YESSARI                | yessari.madiha@gmail.com      | RESEARCHER      |
| Mahmoud         | El Mouden              | mahmoud.elmouden@gmail.com    | RESEARCHER      |
| Mohamed         | BOUSMAH                | bousmah@gmail.com             | RESEARCHER      |
| Mohamed         | EL AZZOUZI             | el-azzouzi.medom@gmail.com    | RESEARCHER      |
| Mohamed         | EL JOUAD               | eljouad.mohamed@gmail.com     | RESEARCHER      |
| Mohamed         | HANINE                 | m.hanine.ensaj@gmail.com      | RESEARCHER      |
| Mohamed         | EL BOUJNOUNI           | med.elnouj@gmail.com          | RESEARCHER      |
| Mohamed         | LACHGAR                | lachgar.m@gmail.com           | RESEARCHER      |
| Mohammed        | Fertat                 | ensaj.fertat@gmail.com        | RESEARCHER      |
| Mohammed        | EL JOURMI              | eljourmi.mohamed@gmail.com    | RESEARCHER      |
| Mohammed        | LAHLOU                 | lahloumohammed@gmail.com      | RESEARCHER      |
| Mounia          | Achak                  | achak_mounia@gmail.com        | RESEARCHER      |
| Nourredine      | ASSAD                  | assad.nourredine@gmail.com    | RESEARCHER      |
| Rabie           | El Otmani              | rabieelotmani@gmail.com       | RESEARCHER      |
| Safa            | ASSIF                  | safaa.assif@gmail.com         | RESEARCHER      |
| Said            | Laasri                 | laasrisaid@gmail.com          | RESEARCHER      |
| Samira          | Touhtouh               | samira.touhtouh@gmail.com     | RESEARCHER      |
| Sanae           | El Hassani             | sanae.elhassani@gmail.com     | RESEARCHER      |
| Younes          | Chhiti                 | chhiti.younes@gmail.com       | RESEARCHER      |
| Younes          | ABOUELMAHJOUB          | younes_abou@gmail.com         | RESEARCHER      |
-->

### Universités | Universities

| name             | country | city     |
| ---------------- | ------- | -------- |
| Chouaib Doukkali | Maroc   | ElJadida |

### Ecoles | Establishments

| name  | address         | university       |
| ----- | --------------- | ---------------- |
| ENSAJ | Km 6, ELHAOUZIA | Chouaib Doukkali |

### laboratoires | laboratories

| name                                                           | establishment | head                |
| -------------------------------------------------------------- | ------ | ------------------- |
| LTI Laboratoire de Technologies de l'Information               | ENSAJ  | Hassan OUAHMANE     |
| LABSIPE Laboratoire des Sciences de l’Ingénieur Pour l’Energie | ENSAJ  | Abdelowahed HAJJAJI |

### Équipes | Teams

| name                                                         | laboratory | head |
| ------------------------------------------------------------ | ---------- | ---- |
| THS Télécommunications, Hyperfréquence et Systèmes embarqués | LTI        |      |
| RMS Réseaux, Mobiquité et Sécurité                           | LTI        |      |
