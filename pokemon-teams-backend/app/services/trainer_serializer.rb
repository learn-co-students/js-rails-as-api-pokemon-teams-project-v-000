class TrainerSerializer
    include FastJsonapi::ObjectSerializer
    attributes :name, :id
    has_many :pokemons
    def initialize(trainer_object)
        @trainer = trainer_object
    end

    # def to_serialized_json
    #     @trainer.to_json(:include => {
    #       :pokemon => {:only => [:species, :nickname]}
    #     })
    # end

    def to_serialized_json
        options = {}
        options[:include] = {
            pokemon: {
                only: [:species, :nickname]
            }
        }
        @trainer.to_json(options)
    end
end
