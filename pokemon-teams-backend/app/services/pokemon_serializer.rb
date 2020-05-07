class PokemonSerializer
    include FastJsonapi::ObjectSerializer
    attributes :species, :nickname
    belongs_to :trainer

    def initialize(pokemon_object)
        @pokemon = pokemon_object
    end

    # def to_serialized_json
    #     @pokemon.to_json(:include => {
    #       :trainer => {:only => [:name]}
    #     })
    # end

    def to_serialized_json
        options = {}
        options[:include] = {
            trainer: {
                only: [:name]
            }
        }
        @pokemon.to_json(options)
    end
end

 