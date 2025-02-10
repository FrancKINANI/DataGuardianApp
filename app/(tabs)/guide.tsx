import { StyleSheet, ScrollView, View } from 'react-native';
import { Text, useTheme, Card, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Dimensions, Animated } from 'react-native';

type GuideSection = {
  id: string;
  title: string;
  icon: string;
  content: string[];
};

type Quiz = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

type Example = {
  id: string;
  title: string;
  scenario: string;
  impact: string;
  solution: string;
};

const guideSections: GuideSection[] = [
  {
    id: 'basics',
    title: 'Les bases du réseau',
    icon: 'globe-outline',
    content: [
      'Le réseau est l\'infrastructure qui permet à votre appareil de communiquer avec Internet.',
      'Les données sont envoyées et reçues sous forme de "paquets" à travers ce réseau.',
      'Chaque application utilise le réseau différemment pour envoyer ou recevoir des informations.',
    ],
  },
  {
    id: 'data',
    title: 'Consommation de données',
    icon: 'analytics-outline',
    content: [
      'Les données mobiles sont mesurées en bytes (B), kilobytes (KB), megabytes (MB), ou gigabytes (GB).',
      '1 MB = 1024 KB, 1 GB = 1024 MB',
      'Le streaming vidéo et les téléchargements consomment beaucoup de données.',
      'Les messages texte et la navigation web utilisent généralement moins de données.',
    ],
  },
  {
    id: 'security',
    title: 'Sécurité et confidentialité',
    icon: 'shield-checkmark-outline',
    content: [
      'Certaines applications peuvent envoyer des données en arrière-plan sans votre connaissance.',
      'Un VPN peut protéger vos données en les chiffrant.',
      'Il est important de surveiller quelles applications accèdent à Internet.',
      'Les réseaux Wi-Fi publics peuvent être dangereux pour vos données personnelles.',
    ],
  },
  {
    id: 'monitoring',
    title: 'Surveillance du réseau',
    icon: 'eye-outline',
    content: [
      'DataGuardian surveille en temps réel le trafic réseau de votre appareil.',
      'Vous pouvez voir quelles applications utilisent le plus de données.',
      'Les alertes vous préviennent en cas d\'utilisation excessive.',
      'L\'historique vous permet d\'analyser vos habitudes d\'utilisation.',
    ],
  },
  {
    id: 'tips',
    title: 'Conseils pratiques',
    icon: 'bulb-outline',
    content: [
      'Désactivez les données en arrière-plan pour les applications peu utilisées.',
      'Utilisez le Wi-Fi plutôt que les données mobiles quand c\'est possible.',
      'Définissez des limites d\'utilisation pour éviter les surprises.',
      'Vérifiez régulièrement votre historique de consommation.',
    ],
  },
];

// Ajout des exemples concrets
const realExamples: Example[] = [
  {
    id: 'background',
    title: 'Applications en arrière-plan',
    scenario: 'Une application de réseaux sociaux continue d\'actualiser votre fil même quand vous ne l\'utilisez pas.',
    impact: 'Consommation excessive de données et batterie, potentielle fuite d\'informations personnelles.',
    solution: 'Désactivez les actualisations en arrière-plan dans les paramètres de l\'application.',
  },
  {
    id: 'public-wifi',
    title: 'Wi-Fi public non sécurisé',
    scenario: 'Vous vous connectez au Wi-Fi gratuit d\'un café pour consulter vos emails.',
    impact: 'Risque d\'interception de vos données personnelles par des pirates.',
    solution: 'Utilisez un VPN ou privilégiez votre connexion mobile pour les données sensibles.',
  },
  // ... autres exemples
];

// Ajout des quiz
const quizQuestions: Quiz[] = [
  {
    id: 'data-units',
    question: 'Combien de KB font 1 MB ?',
    options: ['100 KB', '1000 KB', '1024 KB', '2048 KB'],
    correctAnswer: 2,
    explanation: '1 MB = 1024 KB car les unités informatiques suivent une base binaire (2^10 = 1024).',
  },
  {
    id: 'security',
    question: 'Quelle pratique est la plus sûre ?',
    options: [
      'Utiliser le Wi-Fi public sans protection',
      'Utiliser un VPN sur un réseau public',
      'Désactiver le pare-feu',
      'Partager ses identifiants',
    ],
    correctAnswer: 1,
    explanation: 'Un VPN chiffre vos données et protège votre vie privée sur les réseaux publics.',
  },
  // ... autres questions
];

export default function GuideScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [slideAnim] = useState(new Animated.Value(0));

  const handleAnswerSelection = (index: number) => {
    setSelectedAnswer(index);
    setShowAnswer(true);
  };

  const nextQuestion = () => {
    Animated.sequence([
      Animated.timing(slideAnim, {
        toValue: -Dimensions.get('window').width,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start();

    setCurrentQuizIndex((prev) => (prev + 1) % quizQuestions.length);
    setShowAnswer(false);
    setSelectedAnswer(null);
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Button
          mode="text"
          onPress={() => router.back()}
          icon={props => <Ionicons name="arrow-back" size={24} {...props} />}
          style={styles.backButton}
        >
          Retour
        </Button>
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>
          Guide et concepts
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
          Comprendre la protection des données
        </Text>
      </View>

      {guideSections.map((section) => (
        <Card
          key={section.id}
          style={[styles.sectionCard, { backgroundColor: theme.colors.surface }]}
        >
          <Card.Content>
            <View style={styles.sectionHeader}>
              <Ionicons
                name={section.icon as any}
                size={32}
                color={theme.colors.primary}
                style={styles.sectionIcon}
              />
              <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
                {section.title}
              </Text>
            </View>
            {section.content.map((text, index) => (
              <View key={index} style={styles.bulletPoint}>
                <Text style={[styles.bulletDot, { color: theme.colors.primary }]}>•</Text>
                <Text style={[styles.bulletText, { color: theme.colors.onSurfaceVariant }]}>
                  {text}
                </Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      ))}

      {/* Exemples concrets */}
      <Text style={[styles.sectionTitle, { color: theme.colors.onBackground, marginTop: 30 }]}>
        Exemples concrets
      </Text>
      {realExamples.map((example) => (
        <Card key={example.id} style={[styles.exampleCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text style={[styles.exampleTitle, { color: theme.colors.primary }]}>
              {example.title}
            </Text>
            <Text style={[styles.exampleText, { color: theme.colors.onSurface }]}>
              Scénario : {example.scenario}
            </Text>
            <Text style={[styles.exampleText, { color: theme.colors.error, marginTop: 8 }]}>
              Impact : {example.impact}
            </Text>
            <Text style={[styles.exampleText, { color: theme.colors.primary, marginTop: 8 }]}>
              Solution : {example.solution}
            </Text>
          </Card.Content>
        </Card>
      ))}

      {/* Quiz interactif */}
      <Text style={[styles.sectionTitle, { color: theme.colors.onBackground, marginTop: 30 }]}>
        Testez vos connaissances
      </Text>
      <Animated.View style={[styles.quizContainer, { transform: [{ translateX: slideAnim }] }]}>
        <Card style={[styles.quizCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text style={[styles.quizQuestion, { color: theme.colors.onSurface }]}>
              {quizQuestions[currentQuizIndex].question}
            </Text>
            {quizQuestions[currentQuizIndex].options.map((option, index) => (
              <Button
                key={index}
                mode={selectedAnswer === index ? 'contained' : 'outlined'}
                onPress={() => handleAnswerSelection(index)}
                style={[
                  styles.quizOption,
                  showAnswer && index === quizQuestions[currentQuizIndex].correctAnswer && {
                    backgroundColor: theme.colors.primary + '20',
                  },
                ]}
                disabled={showAnswer}
              >
                {option}
              </Button>
            ))}
            {showAnswer && (
              <View style={styles.explanationContainer}>
                <Text style={[styles.explanation, { color: theme.colors.onSurfaceVariant }]}>
                  {quizQuestions[currentQuizIndex].explanation}
                </Text>
                <Button mode="contained" onPress={nextQuestion} style={styles.nextButton}>
                  Question suivante
                </Button>
              </View>
            )}
          </Card.Content>
        </Card>
      </Animated.View>
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
    marginBottom: 30,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 17,
  },
  sectionCard: {
    marginBottom: 20,
    borderRadius: 15,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIcon: {
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bulletDot: {
    marginRight: 8,
    fontSize: 16,
  },
  bulletText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
  },
  exampleCard: {
    marginBottom: 16,
    borderRadius: 15,
  },
  exampleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  exampleText: {
    fontSize: 14,
    lineHeight: 20,
  },
  quizContainer: {
    marginBottom: 20,
  },
  quizCard: {
    borderRadius: 15,
  },
  quizQuestion: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  quizOption: {
    marginBottom: 10,
  },
  explanationContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 10,
  },
  explanation: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  nextButton: {
    marginTop: 10,
  },
}); 