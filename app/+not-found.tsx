import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Page non trouvée' }} />
      <View style={styles.container}>
        <Text style={styles.title}>Cette page n'existe pas.</Text>
        <Link href="/" asChild>
          <Button mode="contained" style={styles.button}>
            Retourner à l'accueil
          </Button>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    marginTop: 15,
  },
}); 