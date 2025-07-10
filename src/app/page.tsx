//import { Amplify } from 'aws-amplify';
//import awsExports from '@/aws-exports';
import { EnvProvider } from '@/env/provider';
import LandingComponet from '@/components/landing-component';

//Amplify.configure(awsExports);

export default function Home() {

  return (
    <main className="app-main">
      <EnvProvider>
        <LandingComponet />
      </EnvProvider>
    </main>
  );
}
