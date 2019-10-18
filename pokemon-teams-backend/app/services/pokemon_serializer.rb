class PokemonSerializer

  def initialize(pokemon)
    @pokemon = pokemon
  end

  def to_serialized_json
    @pokemon.to_json(only: [:id, :nickname, :species], :include => {
      :trainer => {only: [:name, :id]}
    })
  end

end
