import { h } from 'preact';
import { render } from '@testing-library/preact';
 
import FormCard from './index';

children = <div>Hello World</div>


describe('FormCard', () => {
  test('renders Children component', () => {
    render(<FormCard children={children} showSpinner={false}/>);
  });
});