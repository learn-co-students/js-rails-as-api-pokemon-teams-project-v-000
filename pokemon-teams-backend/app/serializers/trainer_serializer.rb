class TrainerSerializer
  include FastJsonapi::ObjectSerializer
  has_many :pokemon
  attributes :name
end
