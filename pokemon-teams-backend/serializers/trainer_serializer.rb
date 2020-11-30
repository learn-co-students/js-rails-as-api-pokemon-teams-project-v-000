class TrainerSerializer < ActiveModel::Serializer
    attributes :id, :name
    has_many :pokemons 

    # def initialize(trainer_object)
    #     @trainer = trainer_object
    # end
    # def to_serialized_json
    #     options = {
    #         include: {
    #             trainer: {
    #                 only: [:name]
    #             },
    #             pokemon: {
    #                 only: [:species, :nickname]
    #             }
    #         },
    #         except: [:updated_at],
    #     }
    #     @trainer.to_json(options)
    # end
end