class PokemonSerializer
  
  def options
    { 
      only: [:id, :nickname, :species],
      include: {
        trainer: {only: [:id]}
      }
      
    }
  end
  
  def initialize(pokemon, options={})
    @pokemon = pokemon
  end

  def to_serialized_json
    @pokemon.to_json(self.options)
  end

end