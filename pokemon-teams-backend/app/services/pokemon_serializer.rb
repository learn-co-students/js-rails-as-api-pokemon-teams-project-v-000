class PokemonSerializer
 
    def initialize(pokemon_object)
        @pokemon = pokemon_object
    end
   
    def to_serialized_json
        @pokemon.to_json(:include => {
            :trainer => {:only => [:id, :name]}
        }, :only => [:id, :species, :nickname, :trainer_id])
    end
    

end