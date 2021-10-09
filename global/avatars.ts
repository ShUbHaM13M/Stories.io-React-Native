const getAvatar = (seed: string) =>
  `https://avatars.dicebear.com/api/pixel-art/${seed}.svg`;

function generateRandomSeed() {
  return Math.random().toString(16).substr(2, 8);
}

function generateRandomAvatar() {
  return getAvatar(generateRandomSeed());
}

export { generateRandomAvatar, getAvatar };
