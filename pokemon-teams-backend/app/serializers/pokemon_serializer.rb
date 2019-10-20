class PokemonSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :species, :nickname
  belongs_to :trainer
end
