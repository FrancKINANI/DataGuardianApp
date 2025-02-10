import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Linking } from 'react-native';
import { Text, List, useTheme, Button, Card, Searchbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function HelpScreen() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: "Comment fonctionne la surveillance des données ?",
      answer: "DataGuardian surveille en temps réel le trafic réseau de votre appareil et vous alerte en cas d'utilisation suspecte ou excessive. L'application analyse les données envoyées et reçues par chaque application installée sur votre appareil."
    },
    {
      question: "Comment configurer les alertes ?",
      answer: "Accédez aux paramètres de notification pour définir vos seuils d'alerte et personnaliser les types de notifications que vous souhaitez recevoir. Vous pouvez définir des limites quotidiennes, hebdomadaires ou mensuelles."
    },
    {
      question: "Les données sont-elles sécurisées ?",
      answer: "Oui, DataGuardian ne collecte que les métadonnées nécessaires au suivi de votre consommation. Aucune donnée personnelle n'est stockée ou partagée avec des tiers."
    },
    {
      question: "Comment exporter mes données ?",
      answer: "Dans l'onglet Historique, utilisez le bouton d'export pour télécharger vos données au format CSV. Vous pouvez choisir la période souhaitée."
    },
    {
      question: "Puis-je utiliser l'application hors ligne ?",
      answer: "Oui, l'application continue de fonctionner hors ligne pour surveiller votre utilisation des données. La synchronisation se fera automatiquement lors de la reconnexion."
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Button
          icon={({ size, color }) => (
            <Ionicons name="arrow-back" size={size} color={color} />
          )}
          onPress={() => router.back()}
        >
          Retour
        </Button>
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>
          Aide
        </Text>
      </View>

      <Searchbar
        placeholder="Rechercher dans l'aide"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

      <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
        <List.Item
          title="Support technique"
          description="Contactez-nous pour obtenir de l'aide"
          onPress={() => Linking.openURL('mailto:support@dataguardian.com')}
          left={props => (
            <List.Icon {...props} icon="headphones" />
          )}
        />
        <List.Item
          title="Centre d'aide en ligne"
          description="Consultez notre documentation complète"
          onPress={() => Linking.openURL('https://dataguardian.com/help')}
          left={props => (
            <List.Icon {...props} icon="book-open-variant" />
          )}
        />
      </View>

      <Text style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
        Questions fréquentes
      </Text>

      {filteredFaqs.map((faq, index) => (
        <Card key={index} style={styles.faqCard}>
          <Card.Content>
            <Text style={[styles.question, { color: theme.colors.primary }]}>
              {faq.question}
            </Text>
            <Text style={[styles.answer, { color: theme.colors.onSurface }]}>
              {faq.answer}
            </Text>
          </Card.Content>
        </Card>
      ))}

      {filteredFaqs.length === 0 && (
        <Text style={[styles.noResults, { color: theme.colors.onSurfaceVariant }]}>
          Aucun résultat trouvé pour "{searchQuery}"
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 10,
  },
  section: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  faqCard: {
    marginBottom: 12,
    borderRadius: 10,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  searchbar: {
    marginBottom: 20,
    borderRadius: 10,
    elevation: 2,
  },
  answer: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
}); 