/**
 * ============================================================================
 * OUTIL D'AJUSTEMENT DES STYLES POUR GOOGLE DOCS
 * ============================================================================
 * Auteur : Fabrice Faucheux
 * 
 * Description :
 * Ce script ajoute un menu personnalisé et un panneau latéral interactif (UI) 
 * permettant de redimensionner rapidement et uniformément toutes les polices 
 * d'un document Google Docs (Texte normal, Titre, Sous-titre, Titres 1 à 6).
 * Il permet également de modifier la police globale, la couleur et l'interligne.
 * 
 * Fonctionnalités principales :
 * - Panneau latéral moderne (Material Design) intégré au document.
 * - Sauvegarde automatique des préférences de l'utilisateur (PropertiesService).
 * - Application récursive sur le corps du document, les listes et les tableaux.
 * - Choix de la police de caractères, des couleurs par style et de l'interligne.
 * - Option pour inclure/exclure les en-têtes et pieds de page.
 * 
 * Utilisation :
 * L'outil se charge automatiquement à l'ouverture du document via la fonction 
 * onOpen(), qui crée le menu "Ajustement des styles" en haut de la page.
 * ============================================================================
 */

function onOpen() {
    DocumentApp.getUi()
        .createMenu('Ajustement des styles')
        .addItem("Ouvrir l'outil", 'afficherBarreLateraleAjustementStyles')
        .addSeparator()
        .addItem('Rapide : Texte normal = 12', 'definirTexteNormal12Rapide')
        .addToUi();
}

function afficherBarreLateraleAjustementStyles() {
    const html = HtmlService.createHtmlOutputFromFile('sidebar')
        .setTitle('Ajustement des styles');
    DocumentApp.getUi().showSidebar(html);
}

function definirTexteNormal12Rapide() {
    appliquerTaillesStyles({ NORMAL: 12 }, null, { inclureEnTetesPieds: false });
}

/**
 * Applique les tailles, polices, couleurs et interlignes dans tout le document.
 *
 * @param {Object} carteTailles ex. {NORMAL:12, HEADING1:20, TITLE:28, SUBTITLE:16}
 * @param {Object} carteCouleurs ex. {HEADING1:"#FF0000"}
 * @param {Object} optionsGlobales { inclureEnTetesPieds: boolean, fontFamily: string, lineSpacing: string }
 */
function appliquerTaillesStyles(carteTailles, carteCouleurs, optionsGlobales) {
    const documentActif = DocumentApp.getActiveDocument();

    // Valider les tailles en entrée (sécurité basique)
    const taillesNettoyees = {};
    Object.keys(carteTailles || {}).forEach(clef => {
        const nombre = Number(carteTailles[clef]);
        if (Number.isFinite(nombre) && nombre >= 6 && nombre <= 96) taillesNettoyees[clef] = nombre;
    });

    const couleursNettoyees = carteCouleurs || {};

    if (typeof optionsGlobales === 'boolean') {
        optionsGlobales = { inclureEnTetesPieds: optionsGlobales };
    }
    optionsGlobales = optionsGlobales || {};

    // Appliquer au corps du document
    parcourirEtRedimensionner_(documentActif.getBody(), taillesNettoyees, couleursNettoyees, optionsGlobales);

    // Appliquer optionnellement aux en-têtes et pieds de page (s'ils existent)
    if (optionsGlobales.inclureEnTetesPieds) {
        const enTete = documentActif.getHeader();
        const piedDePage = documentActif.getFooter();
        if (enTete) parcourirEtRedimensionner_(enTete, taillesNettoyees, couleursNettoyees, optionsGlobales);
        if (piedDePage) parcourirEtRedimensionner_(piedDePage, taillesNettoyees, couleursNettoyees, optionsGlobales);
    }
}

function parcourirEtRedimensionner_(conteneur, carteTailles, carteCouleurs, optionsGlobales) {
    if (!conteneur || !conteneur.getNumChildren) return;

    for (let i = 0; i < conteneur.getNumChildren(); i++) {
        const enfant = conteneur.getChild(i);
        const typeEnfant = enfant.getType();

        if (typeEnfant === DocumentApp.ElementType.PARAGRAPH) {
            redimensionnerParagraphe_(enfant.asParagraph(), carteTailles, carteCouleurs, optionsGlobales);
            continue;
        }

        if (typeEnfant === DocumentApp.ElementType.LIST_ITEM) {
            redimensionnerElementListe_(enfant.asListItem(), carteTailles, carteCouleurs, optionsGlobales);
            continue;
        }

        if (typeEnfant === DocumentApp.ElementType.TABLE) {
            const tableau = enfant.asTable();
            for (let r = 0; r < tableau.getNumRows(); r++) {
                const ligne = tableau.getRow(r);
                for (let c = 0; c < ligne.getNumCells(); c++) {
                    parcourirEtRedimensionner_(ligne.getCell(c), carteTailles, carteCouleurs, optionsGlobales);
                }
            }
            continue;
        }

        if (enfant.getNumChildren) {
            parcourirEtRedimensionner_(enfant, carteTailles, carteCouleurs, optionsGlobales);
        }
    }
}

function redimensionnerParagraphe_(paragraphe, carteTailles, carteCouleurs, optionsGlobales) {
    const titre = paragraphe.getHeading(); // DocumentApp.ParagraphHeading
    const clef = clefTitre_(titre);
    const taille = carteTailles[clef];
    const couleur = carteCouleurs[clef];

    if (optionsGlobales.lineSpacing) {
        paragraphe.setLineSpacing(Number(optionsGlobales.lineSpacing));
    }

    const texte = paragraphe.editAsText();
    if (texte) {
        if (optionsGlobales.fontFamily) {
            texte.setFontFamily(optionsGlobales.fontFamily);
        }

        if (couleur) {
            texte.setForegroundColor(couleur);
        }

        if (taille) {
            // Sécurité pour les paragraphes vides
            if (texte.getText().length === 0) {
                try { texte.setFontSize(taille); } catch (erreur) {}
            } else {
                texte.setFontSize(taille);
            }
        }
    }
}

function redimensionnerElementListe_(elementListe, carteTailles, carteCouleurs, optionsGlobales) {
    const titre = elementListe.getHeading();
    const clef = clefTitre_(titre);
    const taille = carteTailles[clef] || carteTailles.NORMAL; // repli sur NORMAL pour les listes
    const couleur = carteCouleurs[clef] || carteCouleurs.NORMAL;

    if (optionsGlobales.lineSpacing) {
        elementListe.setLineSpacing(Number(optionsGlobales.lineSpacing));
    }

    const texte = elementListe.editAsText();
    if (texte) {
        if (optionsGlobales.fontFamily) {
            texte.setFontFamily(optionsGlobales.fontFamily);
        }

        if (couleur) {
            texte.setForegroundColor(couleur);
        }

        if (taille) {
            // Sécurité pour les éléments de liste vides
            if (texte.getText().length === 0) {
                try { texte.setFontSize(taille); } catch (erreur) {}
            } else {
                texte.setFontSize(taille);
            }
        }
    }
}

function clefTitre_(enumTitre) {
    switch (enumTitre) {
        case DocumentApp.ParagraphHeading.TITLE: return 'TITLE';
        case DocumentApp.ParagraphHeading.SUBTITLE: return 'SUBTITLE';
        case DocumentApp.ParagraphHeading.HEADING1: return 'HEADING1';
        case DocumentApp.ParagraphHeading.HEADING2: return 'HEADING2';
        case DocumentApp.ParagraphHeading.HEADING3: return 'HEADING3';
        case DocumentApp.ParagraphHeading.HEADING4: return 'HEADING4';
        case DocumentApp.ParagraphHeading.HEADING5: return 'HEADING5';
        case DocumentApp.ParagraphHeading.HEADING6: return 'HEADING6';
        case DocumentApp.ParagraphHeading.NORMAL:
        default: return 'NORMAL';
    }
}

/**
 * Récupère les préférences de l'utilisateur (tailles sauvegardées).
 */
function recupererPreferencesUtilisateur() {
    const proprietes = PropertiesService.getUserProperties();
    const preferences = proprietes.getProperty('PreferencesAjustementStyles');
    return preferences ? JSON.parse(preferences) : null;
}

/**
 * Sauvegarde les préférences de l'utilisateur.
 */
function sauvegarderPreferencesUtilisateur(preferences) {
    const proprietes = PropertiesService.getUserProperties();
    proprietes.setProperty('PreferencesAjustementStyles', JSON.stringify(preferences));
    return true;
}