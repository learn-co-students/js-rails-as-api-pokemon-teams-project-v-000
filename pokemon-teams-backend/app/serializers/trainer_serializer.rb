class TrainerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name
  has_many :pokemons


  #handles how the Trainer object is first born -initialize will take in whatever variable we're dealing with
  #and store it as an instance variable so we can use it in method to_serialized_json
  def initialize(trainer_object)
    @trainer = trainer_object
  end

 #this method will call to_json on the @trainer instance variable, handling the inclusion and exclusion of attributes, and return the results.
  def to_serialized_json
    @trainer.to_json(:include => {
      :pokemons => {:only => [:id, :nickname, :species, :trainer_id]}
    },:except => [:created_at, :updated_at])
  end

end
