# Application de préparation aux courses

Application mobile développée avec Flutter permettant de rechercher une course et de suivre un programme d'entraînement adapté afin de préparer son objectif.

Le projet repose sur une API REST dédiée qui centralise les utilisateurs, les courses, les préparations et les entraînements.

## Fonctionnement

Le parcours principal de l'utilisateur est le suivant :

1. Rechercher une course.
2. Consulter les préparations existantes pour cette course.
3. Sélectionner la préparation qui correspond le mieux à son objectif.
4. Si aucune préparation ne convient, créer sa propre préparation.
5. Suivre les différentes étapes et séances d'entraînement de la préparation.
6. Visualiser son programme depuis un planning mensuel.

## Organisation des données

Une course peut être associée à plusieurs préparations.

Chaque préparation est composée de plusieurs étapes qui permettent de structurer la progression vers l'objectif.

Ces étapes regroupent les différentes séances d'entraînement à réaliser.

Structure simplifiée :

```text
Course
└── Préparations
    └── Étapes
        └── Entraînements
```

## Fonctionnalités

* Recherche de courses
* Consultation des préparations disponibles
* Création de préparations personnalisées
* Organisation d'une préparation en plusieurs étapes
* Création et gestion des entraînements
* Planning mensuel des séances
* Suivi du programme d'entraînement
* Gestion des comptes utilisateurs
* Communication avec une API REST dédiée

## Technologies

* Flutter
* Dart
* API REST personnalisée
* Architecture client / serveur

## Architecture

L'application Flutter constitue la partie cliente du projet.

Elle communique avec une API REST séparée chargée de gérer les données et la logique serveur.

```text
Application Flutter
        |
        | HTTP / REST
        v
     API REST
        |
        v
 Base de données
```

## Objectif du projet

L'objectif est de proposer une application permettant de centraliser la préparation d'une course, depuis la recherche de l'objectif jusqu'à la planification et au suivi des différentes séances d'entraînement.

Le projet est également l'occasion de mettre en pratique le développement d'une application Flutter complète communiquant avec une API REST dédiée.
