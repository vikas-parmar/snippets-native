import { useSignIn, useSSO } from '@clerk/clerk-expo';
import * as AuthSession from 'expo-auth-session';
import { Link } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { LogIn } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  useWarmUpBrowser();

  const { isLoaded, signIn, setActive } = useSignIn();
  const { startSSOFlow } = useSSO();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSignInPress = async () => {
    if (!isLoaded) return;
    setLoading(true);
    setError('');

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      await setActive({ session: result.createdSessionId });
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const onGooglePress = async () => {
    try {
      const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
        strategy: 'oauth_google',
        redirectUrl: AuthSession.makeRedirectUri(),
      });

      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <LogIn size={40} color="#8B5CF6" />
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to access your account</Text>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={emailAddress}
        onChangeText={setEmailAddress}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text style={styles.forgotPassword}>Forgot password?</Text>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={onSignInPress}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Sign In</Text>
        )}
      </Pressable>

      <Text style={styles.orText}>Or continue with</Text>

      <Pressable style={styles.googleButton} onPress={onGooglePress}>
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </Pressable>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don&#39;t have an account? </Text>
        <Link href="/sign-up" style={styles.link}>
          Sign Up
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    padding: 16,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 24,
  },
  error: {
    color: '#dc3545',
    marginBottom: 16,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    color: '#666',
  },
  forgotPassword: {
    color: '#8B5CF6',
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'right',
  },
  googleButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#e1e1e1',
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  googleButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 100,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#e1e1e1',
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 16,
    marginBottom: 16,
    padding: 16,
  },
  link: {
    color: '#8B5CF6',
    fontWeight: '600',
  },
  orText: {
    color: '#666',
    marginVertical: 24,
    textAlign: 'center',
  },
  subtitle: {
    color: '#666',
    fontSize: 15,
    marginBottom: 8,
  },
  title: {
    color: '#1a1a1a',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 16,
  },
});
