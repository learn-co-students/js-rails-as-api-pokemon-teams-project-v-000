class PokemonSerializer
  include FastJsonapi::ObjectSerializer
  attributes  :nickname
  belongs_to :trainer
end
