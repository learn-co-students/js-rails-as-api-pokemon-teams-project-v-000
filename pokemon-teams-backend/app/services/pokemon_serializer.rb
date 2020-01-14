class PokemonSerializer
  def initialize(pokemon)
    @pokemon = pokemon
  end

  def to_serialized_json
    options = {
       include: {
         trainer: {
           only: [:name, :id]
         },
       },
       only: [:id, :nickname, :species],
     }
     @pokemon.to_json(options)
   end
end
