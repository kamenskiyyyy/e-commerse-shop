import { RequestReset } from '@components/RequestReset';
import { useRouter } from 'next/router';
import { Reset } from '@components/Reset';

export default function ResetPage() {
  const { query } = useRouter();

  if (!query?.token) {
    return (
      <div>
        <p>Sorry, you must supply a token :c</p>
        <RequestReset />
      </div>
    );
  }

  return (
    <div>
      <p>Reset your password</p>
      <Reset />
    </div>
  );
}
