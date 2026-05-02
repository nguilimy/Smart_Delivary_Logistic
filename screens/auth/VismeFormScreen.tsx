import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';

const VismeFormScreen = ({ navigation }: any) => {
  const vismeHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <style>
          body, html {
            margin: 0;
            padding: 0;
            min-height: 100vh;
            background-color: #1a1a2e;
            display: flex;
            justify-content: center;
          }
          .visme_d {
             width: 100%;
             max-width: 100vw;
          }
        </style>
      </head>
      <body>
        <div class="visme_d" data-title="Sample Custom Form" data-url="y713478r-sample-custom-form?sidebar=true" data-domain="forms" data-full-page="false" data-min-height="600px" data-form-id="176445"></div>
        <script src="https://static-bundles.visme.co/forms/vismeforms-embed.js"></script>
      </body>
    </html>
  `;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Visme Form</Text>
        <View style={{ width: 44 }} />
      </View>
      <View style={styles.webviewContainer}>
        <WebView 
          source={{ html: vismeHTML }}
          originWhitelist={['*']}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          mixedContentMode="always"
          style={styles.webview}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  webviewContainer: {
    flex: 1,
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default VismeFormScreen;