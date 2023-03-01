import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { User } from '@prisma/client';

/* export default function useUser() {
  const [user, setUser] = useState();
  const router = useRouter();
  useEffect(() => {
    fetch('/api/users/me')
      .then((response) => response.json())
      .then((data) => {
        if (!data.ok) {
          return router.replace('/enter');
        }
        setUser(data.profile);
      });
  }, [router]);
  return user;
} */

interface ProfileResponse {
  ok: boolean;
  profile: User;
}

export default function useUser() {
  const { data, error } = useSWR<ProfileResponse>('/api/users/me');
  const router = useRouter();

  useEffect(() => {
    if (data && !data.ok && router.pathname !== '/enter') {
      router.replace('/enter');
    }
  }, [data, router]);

  return { user: data?.profile, isLoading: !data && !error };
}
