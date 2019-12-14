class PokemonSerializer
  #attributes :species, :nickname
  #belongs_to :trainer

  def initialize(pokemon_object)
    @pokemon = pokemon_object
  end

  def to_serialized_json
    @pokemon.to_json(:include => {
      :trainer => {:only => [:name]}
      })
    end

end
