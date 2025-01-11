import axios from 'shared/api/axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function createPost( message: string, date: string, authorId: number, accessToken: string ) {
  return axios.post(
    `${API_BASE_URL}/api/posts/create`,
    { message, date, authorId }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });
}

export async function getPostsByUserId(userId: number, accessToken: string) {
  return axios.get(`${API_BASE_URL}/api/posts/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
}

export async function deletePost(userId: number, accessToken: string) {
  return axios.delete(`${API_BASE_URL}/api/posts/${userId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
}