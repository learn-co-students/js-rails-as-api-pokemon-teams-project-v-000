class PokemonSerializer

  def initialize(pokemon_object)
    @pokemon = pokemon_object
    @pokemon.save
  end

end
