{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  name = "nextjs-shell";

  buildInputs = [
    pkgs.nodejs_24
  ];

  shellHook = ''
    echo "Next.js dev shell"
    node -v
    npm -v
    npx -v
  '';
}
