import 'font-awesome/css/font-awesome.css';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: 0;
}

body{
  background: #9B65E6;
  text-rendering: optimizeLegibility !important;
  -webkit-font-smoothing: antialiased !important;
  font-family: sans-serif;
  margin-bottom: 100px
}
`;

export default GlobalStyle;
