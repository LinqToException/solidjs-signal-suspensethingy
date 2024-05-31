import { A } from '@solidjs/router';
import { Suspense, type ParentComponent } from 'solid-js';

const App: ParentComponent = (props) => {
  return (
    <>
      <div style="background-color: #c0ffee; padding: 1em;">
        <A href="/">Home</A>&nbsp;<A href="/Bork">Borked</A>
      </div>

      {/* Removing the Suspense seems to make it work as expected */}
      <Suspense fallback="SUSPENSE">
        {props.children}
      </Suspense>
    </>
  );
};

export default App;
