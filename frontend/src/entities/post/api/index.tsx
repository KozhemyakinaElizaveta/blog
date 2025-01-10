import axios from 'shared/api/axios'

export function createPost( message: string, date: string, authorId: number, accessToken: string ) {
  return axios.post(
    '/api/posts/create',
    { message, date, authorId }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });
}

export async function getPostsByUserId(userId: number, accessToken: string) {
  return axios.get(`/api/posts/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
}

export async function deletePost(userId: number, accessToken: string) {
  return axios.delete(`/api/posts/${userId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
}