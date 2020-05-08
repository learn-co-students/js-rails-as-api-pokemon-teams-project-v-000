class TrainerSerializer #< ActiveModel::Serializer
    include FastJsonapi::ObjectSerializer
    attributes :id, :name
    has_many :pokemons
    def initialize(trainer_object)
        @trainer = trainer_object
    end

    # def to_serialized_json
    #     @trainer.to_json(:include => {
    #       :pokemon => {:only => [:nickname, :species]}
    #     })
    # end

    def to_serialized_json
        options = {}
        options[:include] = {
            pokemons: {
                only: [:nickname, :species]
            }
        }
        @trainer.to_json(options)
    end
end
