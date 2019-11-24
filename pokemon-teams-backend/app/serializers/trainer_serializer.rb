class TrainerSerializer
  def initialize(trainer_object)
    @trainer = trainer_object
  end

  def to_serialized_json
    @trainer.to_json(
      :only => [:id, :name],
      :include => {
        :pokemons => {
          :only => [:id, :nickname, :species, :trainer_id]
        }
      }
    )
  end
end
