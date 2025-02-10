import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

type AuthInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
};

export function AuthInput({
  label,
  value,
  onChangeText,
  secureTextEntry,
  error,
  autoCapitalize = 'none',
  keyboardType = 'default',
}: AuthInputProps) {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      error={!!error}
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
      style={styles.input}
      mode="outlined"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginVertical: 8,
  },
}); 