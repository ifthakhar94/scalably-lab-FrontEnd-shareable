// import { useState } from 'react';
import errorHandler from '@/components/commonComponents/errorComponents/errorHandler';
import useErrorHook from '@/hooks/errorHooks/useErrorHook';
import { myErrorHandler } from '@/utils/myErrorHandler';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { GraphQLError } from 'graphql/error/GraphQLError';

interface getErrorTypes extends GraphQLError {
  code?: number;
}

const errorLink = onError(({ graphQLErrors, networkError }) => {
  // const router = useRouter();

  if (graphQLErrors && graphQLErrors.length > 0) {
    const { message, code }: getErrorTypes = graphQLErrors[0];
    // console.log(`[GraphQL error]: Message: ${message}, Code: ${code}`, typeof code);
    // useErrorHook(code);
    myErrorHandler(code as number);
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_ENDPOINT
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache()
});

export default client;
