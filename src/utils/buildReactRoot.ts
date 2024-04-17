"use server"
import { renderToString } from 'react-dom/server';

const buildReactRoot = (domNode: any) => {
  return renderToString(domNode);
}

export default buildReactRoot;
