class PokemonSerializer
  include FastJsonapi::ObjectSerializer
  attributes :species, :nickname, :trainer
end
