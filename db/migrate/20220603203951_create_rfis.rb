class CreateRfis < ActiveRecord::Migration[6.1]
  def change
    create_table :rfis do |t|
      t.integer :project_id
      t.integer :user_id
      t.string :title
      t.text :body
      t.string :level
      t.string :status

      t.timestamps
    end
  end
end
