import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

type AuthButtonProps = {
  mode?: 'contained' | 'outlined';
  icon?: string;
  onPress: () => void;
  children: React.ReactNode;
  style?: any;
};

export function AuthButton({ mode = 'contained', icon, onPress, children, style }: AuthButtonProps) {
  return (
    <Button
      mode={mode}
      onPress={onPress}
      icon={icon ? ({ size, color }) => <Ionicons name={icon as any} size={size} color={color} /> : undefined}
      style={[styles.button, style]}
      contentStyle={styles.buttonContent}
    >
      {children}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    marginVertical: 8,
  },
  buttonContent: {
    height: 48,
  },
}); 