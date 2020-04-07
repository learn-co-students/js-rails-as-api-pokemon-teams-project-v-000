class TrainerSerializer
  #attributes :name
  #has_many :pokemons

  def initialize(trainer_object)
    @trainer = trainer_object
  end

  def to_serialized_json
    @trainer.to_json(:include =>
      :pokemons)


  end
end
