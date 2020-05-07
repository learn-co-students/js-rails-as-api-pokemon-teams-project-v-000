class TrainerSerializer
    include FastJsonapi::ObjectSerializer
    attributes :name, :id
    has_many :pokemons
    def initialize(trainer_object)
        @trainer = trainer_object
    end

    # def to_serialized_json
    #     @trainer.to_json(:include => {
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
        @trainer.to_json(options)
    end
end
