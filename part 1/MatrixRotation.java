import java.util.LinkedList;
import java.util.Queue;
import java.util.Scanner;

public class MatrixRotation {
    static int[][] matrix;
    static int R;
    static int num_layer;

    public static void main(String[] args) {
        num_layer = 0;
        Scanner sc = new Scanner(System.in);
        System.out.print("Number of rows, columns and Rotation(each separated by space): \n");
        String in = sc.nextLine();
        String[] input = in.split("\\s+");
        int M = Integer.parseInt(input[0]);
        int N = Integer.parseInt(input[1]);
        R = Integer.parseInt(input[2]);
        matrix = new int[M][N];

        for (int i = 0; i < M; i++) {
            System.out.println("Values for row " + i + " (Press enter after " + N + " space sperated values).");
            String col = sc.nextLine();
            String[] cols = col.split("\\s+");
            for (int s = 0; s < cols.length; s++) {
                matrix[i][s] = Integer.parseInt(cols[s]);
            }
            if (i == M - 1)
                break;
        }
        sc.close();
        System.out.println("Before:");
        printMatrix(M, N);
        rotateMatrix(M, N);
        System.out.println("After "+R+" rotation:");
        printMatrix(M, N);
    }

    public static void rotateMatrix(int row, int col) { 

        Queue<Integer> temp = new LinkedList<Integer>(); 

        for (int i = 0 + num_layer; i < col - 1 - num_layer; i++) {
            temp.add(matrix[0 + num_layer][i]);
        }
        for (int i = 0 + num_layer; i < row - 1 - num_layer; i++) {
            temp.add(matrix[i][col - 1 - num_layer]);
        }
        for (int i = col - 1 - num_layer; i > 0 + num_layer; i--) {
            temp.add(matrix[row - 1 - num_layer][i]);
        }
        for (int i = row - 1 - num_layer; i > 0 + num_layer; i--) {
            temp.add(matrix[i][0 + num_layer]);
        }
        int redo = R;

        if ((2 * (row - num_layer * 2) + 2 * (col - num_layer * 2) - 4) > 0) {
            redo = R % (2 * (row - num_layer * 2) + 2 * (col - num_layer * 2) - 4);
        }

        int t;
        for (int i = 0; i < redo; i++) {
            t = temp.poll();
            temp.add(t);
        }

        for (int i = 0 + num_layer; i < col - 1 - num_layer; i++) {
            matrix[0 + num_layer][i] = temp.poll();
        }
        for (int i = 0 + num_layer; i < row - 1 - num_layer; i++) {
            matrix[i][col - 1 - num_layer] = temp.poll();
        }
        for (int i = col - 1 - num_layer; i > 0 + num_layer; i--) {
            matrix[row - 1 - num_layer][i] = temp.poll();
        }
        for (int i = row - 1 - num_layer; i > 0 + num_layer; i--) {
            matrix[i][0 + num_layer] = temp.poll();
        }

        if (num_layer < col / 2 - 1 && num_layer < row / 2 - 1) { 
            num_layer++;
            rotateMatrix(row, col);
        }

    }

    public static void printMatrix(int row, int col) {
        for (int y = 0; y < row; y++) {
            for (int x = 0; x < col; x++) {
                System.out.print(matrix[y][x] + " ");
            }
            System.out.println();
        }
        System.out.println();
    }
}