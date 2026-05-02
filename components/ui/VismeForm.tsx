import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { colors } from '../../constants/colors';

interface VismeFormProps {
  formId: string;
  url: string;
  title: string;
  minHeight?: string;
}

export const VismeForm: React.FC<VismeFormProps> = ({ 
  formId, 
  url, 
  title, 
  minHeight = '600px' 
}) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <style>
          body { margin: 0; padding: 0; background-color: transparent; }
          .visme_d { width: 100%; }
        </style>
      </head>
      <body>
        <div class="visme_d" 
             data-title="${title}" 
             data-url="${url}" 
             data-domain="forms" 
             data-full-page="false" 
             data-min-height="${minHeight}" 
             data-form-id="${formId}">
        </div>
        <script src="https://static-bundles.visme.co/forms/vismeforms-embed.js"></script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}
        scalesPageToFit={true}
        scrollEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 650,
    width: '100%',
    overflow: 'hidden',
    borderRadius: 16,
    backgroundColor: colors.white,
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  }
});
