# TrainingProgramApi

API REST dédiée à une application de création et de suivi de programmes d'entraînement pour la préparation de courses.

Cette API constitue le backend du projet. Elle centralise la gestion des utilisateurs, des courses et des programmes d'entraînement et fournit les différentes ressources nécessaires à l'application mobile Flutter.

## Fonctionnement du projet

L'application permet à un utilisateur de rechercher une course et de consulter les préparations déjà disponibles pour celle-ci.

Il peut ensuite sélectionner une préparation correspondant à son objectif ou créer sa propre préparation.

Une préparation est organisée en plusieurs étapes contenant les différentes séances d'entraînement à réaliser jusqu'à la course.

```text
Course
└── Préparations
    └── Étapes
        └── Entraînements
```

L'API assure la gestion et la persistance de ces différentes ressources.

## Fonctionnalités

L'API permet notamment :

* la création et la gestion des comptes utilisateurs ;
* l'authentification des utilisateurs ;
* la sécurisation des routes avec JWT ;
* la gestion des courses ;
* la création et la gestion des préparations ;
* l'association de plusieurs préparations à une course ;
* la gestion des différentes étapes d'une préparation ;
* la création et la gestion des entraînements ;
* la validation des données reçues par l'API ;
* la communication avec l'application Flutter via des endpoints REST.

## Stack technique

### Backend

* Node.js
* NestJS
* TypeScript

### Base de données

* MongoDB
* Mongoose

### Authentification

* Passport
* JWT
* bcrypt

### Validation

* class-validator
* class-transformer

### Déploiement et environnement

* Docker
* Docker Compose

## Architecture

Le projet repose sur une architecture client / serveur.

```text
Application
        |
        | HTTP / REST
        v
 TrainingProgramApi
     NestJS
        |
        | Mongoose
        v
     MongoDB
```

## Modèle fonctionnel

### Utilisateur

Les utilisateurs disposent d'un compte leur permettant d'accéder aux fonctionnalités de l'application.

L'authentification est gérée par l'API à l'aide de JWT.

### Course

Une course représente l'objectif que l'utilisateur souhaite préparer.

Une course peut être associée à plusieurs préparations différentes.

### Préparation

Une préparation représente un programme d'entraînement complet associé à une course.

Plusieurs préparations peuvent donc être proposées pour une même course afin de répondre à différents besoins.

### Étape

Une préparation est divisée en plusieurs étapes afin de structurer la progression du programme.

### Entraînement

Les entraînements représentent les différentes séances à effectuer au cours de la préparation.

Ils sont ensuite exploités par l'application Flutter pour afficher le programme et construire le planning mensuel de l'utilisateur.

## Objectif

TrainingProgramApi a été développée pour disposer d'un backend indépendant et structuré pour application mobile de préparation aux courses.

Le projet couvre plusieurs problématiques classiques d'une application complète : conception d'une API REST, authentification, sécurisation des routes, modélisation et persistance des données, validation des entrées, communication avec une application mobile et conteneurisation.
