class TrainerSerializer
  
  def initialize(trainer_object)
    @trainer = trainer_object    
  end

  def to_serialized_json
    @trainer.to_json(:include => {
            :pokemons => {:only => [:id, :trainer_id, :species, :nickname]}
            },
            :except => [:created_at, :updated_at])    
  end

end


# include FastJsonapi::ObjectSerializer
#   attributes :id, :name

#   has_many :pokemons
# # add in serializer code from readme