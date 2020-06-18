class TrainerSerializer
  def initialize(trainer_object)
    @trainer = trainer_object
  end

  def to_serialized_json
    options = {
      include: {
        pokemons: {
          only: %i[id nickname species trainer_id]
        }
      },
      except: %i[createed_at updated_at]
    }
    @trainer.to_json(options)
  end
end
