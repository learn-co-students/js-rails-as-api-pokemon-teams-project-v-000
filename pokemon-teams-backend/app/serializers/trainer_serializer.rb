class TrainerSerializer
  include FastJsonapi::ObjectSerializer
  attributes

  def initialize(trainer)
   @trainer = trainer
 end

 def to_serialized_json
   @trainer.to_json(only: [:id, :name], :include => {
     :pokemons => {only: [:id, :nickname, :species]}
   })
 end

end
