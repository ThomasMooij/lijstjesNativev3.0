import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import AppNavigator from "./src/navigation";
import 'react-native-get-random-values';

const client = new ApolloClient({
  uri: 'http://192.168.2.183:8000/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AppNavigator />
    </ApolloProvider>
    )
};

export default App;
