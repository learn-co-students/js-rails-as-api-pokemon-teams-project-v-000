class PokemonSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :trainer 
end
