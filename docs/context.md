# DataGuardian - Application de Surveillance du Trafic Réseau

DataGuardian est une application Android intuitive qui permet à l'utilisateur de surveiller en temps réel le trafic réseau de son téléphone. Elle affiche les sites, serveurs et autres points de communication utilisés par le dispositif, offrant ainsi une meilleure transparence et un contrôle accru sur l'utilisation des données.

---

## Table des Matières

1. [Introduction](#introduction)
2. [Objectifs et Fonctionnalités](#objectifs-et-fonctionnalités)
3. [Choix Technologiques](#choix-technologiques)
4. [Architecture et Flux de l'Application](#architecture-et-flux-de-lapplication)
    - [Flux Utilisateur](#flux-utilisateur)
    - [Modules et Composants](#modules-et-composants)
5. [Sécurité et Confidentialité](#sécurité-et-confidentialité)
6. [Considérations Légales](#considérations-légales)
7. [Améliorations Futures](#améliorations-futures)
8. [Conclusion](#conclusion)

---

## Introduction

**DataGuardian** est conçue pour rendre accessible à tous la surveillance du trafic réseau sur smartphone. L'application capture et affiche les connexions réseau de votre téléphone, vous permettant ainsi de :

- Visualiser en temps réel les sites web, serveurs et adresses IP avec lesquels votre téléphone communique.
- Comprendre et contrôler l'utilisation de vos données.
- Détecter rapidement tout comportement anormal ou suspect.

---

## Objectifs et Fonctionnalités

### Objectifs

- **Transparence :** Offrir une vue claire et en temps réel de toutes les connexions réseau de l’appareil.
- **Contrôle :** Permettre à l’utilisateur de surveiller l’utilisation de ses données et, potentiellement, de bloquer certaines connexions.
- **Accessibilité :** Proposer une interface simple et intuitive, même pour les utilisateurs non techniques.

### Fonctionnalités Principales

- **Surveillance en Temps Réel :**
  - Affichage dynamique des connexions réseau avec détails tels que l’adresse IP, le nom de domaine, le protocole (HTTP, HTTPS, DNS, etc.) et le volume de données échangées.
  
- **Historique et Statistiques :**
  - Enregistrement des connexions pour une consultation ultérieure.
  - Graphiques et rapports sur l’utilisation globale des données.
  
- **Filtres et Alertes :**
  - Possibilité de filtrer les types de trafic affichés.
  - Notifications en cas de trafic inhabituel ou usage de données excessif.
  
- **Interface Utilisateur Simplifiée :**
  - Tableau de bord clair présentant les informations essentielles.
  - Navigation intuitive entre les sections « Trafic en Direct », « Historique » et « Paramètres ».
  
- **Contrôle Actif (optionnel) :**
  - Fonctionnalités avancées pour bloquer des connexions ou domaines jugés indésirables (pour les utilisateurs avertis).

---

## Choix Technologiques

### Langage et Environnement

- **Kotlin :** Langage de programmation principal pour un développement Android moderne et efficace.
- **Android Studio :** IDE recommandé pour le développement et le débogage de l'application.

### Interface Utilisateur

- **Jetpack Compose :** Pour construire une interface utilisateur réactive et déclarative.
- **Material Design :** Pour garantir une cohérence visuelle et une expérience utilisateur optimisée.

### Capture et Analyse du Trafic Réseau

- **API VPNService :**
  - Permet de créer un VPN local qui intercepte le trafic réseau sans nécessiter de privilèges root.
  - Idéal pour surveiller et analyser les paquets en temps réel.
  
- **Bibliothèques de Capture de Paquets :**
  - Utilisation éventuelle de bibliothèques adaptées (ex. : adaptations d’`libpcap` pour Android ou solutions open-source inspirées de NetGuard) pour décoder les paquets réseau.

### Stockage et Persistance

- **Room Database :**
  - Pour sauvegarder l’historique des connexions et les statistiques.
- **SharedPreferences :**
  - Pour stocker les réglages et préférences utilisateur de manière simple.

### Notifications et Tâches de Fond

- **WorkManager / Foreground Service :**
  - Pour assurer la continuité de la surveillance en arrière-plan et gérer les notifications en temps réel.

---

## Architecture et Flux de l'Application

### Flux Utilisateur

1. **Écran d'Accueil / Introduction :**
   - Brève présentation de l'application et de ses avantages.
   - Bouton de démarrage de la surveillance (lancement du service VPN).

2. **Écran de Surveillance en Temps Réel :**
   - Tableau de bord affichant les connexions réseau actives.
   - Détails affichés : nom de domaine, adresse IP, protocole, volume de données.
   - Option de filtrer l’affichage par type de trafic.

3. **Écran Historique et Statistiques :**
   - Liste chronologique des connexions précédentes.
   - Graphiques et statistiques détaillées de l'utilisation des données.
   - Recherche et filtrage dans l’historique.

4. **Écran des Paramètres :**
   - Configuration des filtres et alertes.
   - Gestion des permissions (activation/désactivation du VPN).
   - Options pour activer la fonctionnalité de blocage (si implémentée).

5. **Notifications :**
   - Alertes en cas de trafic suspect ou d’utilisation anormale des données.
   - Possibilité de consulter rapidement les détails via une notification.

### Modules et Composants

- **Module VPN & Capture de Paquets :**
  - Implémentation de la classe étendant `VpnService` pour démarrer un VPN local.
  - Décodage des paquets pour extraire les informations essentielles (adresse IP, nom de domaine, protocole, etc.).

- **Module UI/UX :**
  - Conception d’écrans via Jetpack Compose.
  - Utilisation du Navigation Component pour gérer la navigation entre les écrans.

- **Module Stockage :**
  - Gestion de l’historique et des statistiques via Room.
  - Stockage des préférences utilisateur avec SharedPreferences.

- **Module Analyse & Filtrage :**
  - Algorithmes d’analyse des en-têtes de paquets.
  - Application des filtres en fonction des préférences définies par l'utilisateur.

- **Module Notifications :**
  - Mise en place de WorkManager ou d’un service en premier plan pour la gestion des alertes et notifications.

---

## Sécurité et Confidentialité

- **Gestion des Permissions :**
  - Demande explicite de l’autorisation d’utiliser le VPN via l’API VPNService.
  - Transparence sur les données collectées et leur utilisation.

- **Chiffrement et Stockage Sécurisé :**
  - Chiffrement des données sensibles sauvegardées dans Room.
  - Communication sécurisée lors de l’envoi ou de la mise à jour des données.

- **Audit et Journalisation :**
  - Journalisation des actions critiques pour permettre un audit en cas de besoin.
  - Option de suppression complète de l’historique pour protéger la vie privée.

---

## Considérations Légales

- **Conformité RGPD et Législation Locale :**
  - Informer clairement l’utilisateur de la collecte et du traitement de ses données.
  - Obtenir son consentement explicite pour lancer la surveillance.
  
- **Utilisation du VPNService :**
  - Fournir une explication détaillée sur le fonctionnement du VPN local et ses implications.
  - Mettre en garde sur le fait que l’application n’interfère pas avec la sécurité globale de l’appareil.

---

## Améliorations Futures

- **Analyse Avancée et Intelligence Artificielle :**
  - Intégrer des outils d’analyse comportementale pour détecter automatiquement les anomalies.
  
- **Personnalisation de l'Interface :**
  - Offrir davantage d’options de personnalisation de l’affichage et des rapports.
  
- **Fonctionnalités de Blocage Proactif :**
  - Développer des mécanismes pour bloquer certaines connexions ou domaines jugés indésirables.
  
- **Support Multi-Plateformes :**
  - Envisager une extension de l’application vers d’autres systèmes (par exemple iOS) en adaptant les fonctionnalités.

---

## Conclusion

DataGuardian offre aux utilisateurs une solution puissante pour surveiller et contrôler le trafic réseau de leur téléphone Android. Grâce à l’API VPNService, Kotlin et Jetpack Compose, l’application allie modernité, sécurité et facilité d’utilisation. Ce document constitue la base de développement pour une application transparente et accessible, capable de donner aux utilisateurs le contrôle sur l’usage de leurs données.