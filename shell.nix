{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  name = "MarketHub Dev Shell";

  buildInputs = [
    pkgs.nodejs_24
    pkgs.jdk21
  ];

  shellHook = ''
    node -v
    npm -v
    npx -v
    java -version
    javac -version
  '';
}
